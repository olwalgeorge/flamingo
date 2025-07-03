import { 
  Event, 
  EventFundraising, 
  EventBudget, 
  EventExpenditure, 
  EventFinancialSummary,
  FinancialReport 
} from '@/types';

export class FinancialManagementService {
  private fundraisingData: Map<string, EventFundraising> = new Map();
  private budgetData: Map<string, EventBudget> = new Map();
  private expenditureData: Map<string, EventExpenditure[]> = new Map();

  /**
   * Initialize financial tracking for a new event
   */
  initializeEventFinances(event: Event, initialBudget?: number, fundraisingTarget?: number): void {
    if (!event.hasFinancialTracking) return;

    // Create fundraising record
    this.createFundraising(event.id, fundraisingTarget || event.fundraisingGoal || 0, event.currency || 'USD');
    
    // Create budget record
    this.createBudget(event.id, initialBudget || event.estimatedCost || 0, event.currency || 'USD');
    
    // Initialize expenditure tracking
    this.expenditureData.set(event.id, []);
  }

  /**
   * Create fundraising campaign for an event
   */
  createFundraising(eventId: string, targetAmount: number, currency: string = 'USD'): EventFundraising {
    const fundraising: EventFundraising = {
      id: this.generateId(),
      eventId,
      targetAmount,
      currentAmount: 0,
      currency,
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      status: 'active',
      fundraisingMethods: [
        { method: 'online', amount: 0, percentage: 0 },
        { method: 'cash', amount: 0, percentage: 0 },
        { method: 'mobile_money', amount: 0, percentage: 0 },
        { method: 'bank_transfer', amount: 0, percentage: 0 },
        { method: 'sponsorship', amount: 0, percentage: 0 }
      ],
      donations: []
    };

    this.fundraisingData.set(eventId, fundraising);
    return fundraising;
  }

  /**
   * Create budget for an event
   */
  createBudget(eventId: string, totalBudget: number, currency: string = 'USD'): EventBudget {
    const budget: EventBudget = {
      id: this.generateId(),
      eventId,
      totalBudget,
      currency,
      categories: this.getDefaultBudgetCategories(totalBudget),
      contingency: {
        percentage: 10,
        amount: totalBudget * 0.1,
        purpose: 'Emergency and unexpected expenses'
      },
      approvalStatus: 'draft',
      createdBy: 'system',
      createdDate: new Date()
    };

    this.budgetData.set(eventId, budget);
    return budget;
  }

  /**
   * Add donation to fundraising campaign
   */
  addDonation(eventId: string, donation: {
    donorName: string;
    amount: number;
    method: string;
    isAnonymous: boolean;
    message?: string;
  }): void {
    const fundraising = this.fundraisingData.get(eventId);
    if (!fundraising) return;

    const newDonation = {
      id: this.generateId(),
      ...donation,
      date: new Date()
    };

    fundraising.donations.push(newDonation);
    fundraising.currentAmount += donation.amount;

    // Update method breakdown
    const methodIndex = fundraising.fundraisingMethods.findIndex(m => m.method === donation.method);
    if (methodIndex >= 0) {
      fundraising.fundraisingMethods[methodIndex].amount += donation.amount;
      fundraising.fundraisingMethods[methodIndex].percentage = 
        (fundraising.fundraisingMethods[methodIndex].amount / fundraising.currentAmount) * 100;
    }

    // Recalculate all percentages
    fundraising.fundraisingMethods.forEach(method => {
      method.percentage = fundraising.currentAmount > 0 
        ? (method.amount / fundraising.currentAmount) * 100 
        : 0;
    });

    // Check if target reached
    if (fundraising.currentAmount >= fundraising.targetAmount) {
      fundraising.status = 'completed';
    }
  }

  /**
   * Add expenditure record
   */
  addExpenditure(expenditure: Omit<EventExpenditure, 'id'>): EventExpenditure {
    const newExpenditure: EventExpenditure = {
      id: this.generateId(),
      ...expenditure
    };

    const existingExpenditures = this.expenditureData.get(expenditure.eventId) || [];
    existingExpenditures.push(newExpenditure);
    this.expenditureData.set(expenditure.eventId, existingExpenditures);

    return newExpenditure;
  }

  /**
   * Generate comprehensive financial summary for an event
   */
  generateFinancialSummary(eventId: string): EventFinancialSummary | null {
    const fundraising = this.fundraisingData.get(eventId);
    const budget = this.budgetData.get(eventId);
    const expenditures = this.expenditureData.get(eventId) || [];

    if (!fundraising || !budget) return null;

    const totalSpent = expenditures
      .filter(exp => exp.status === 'paid')
      .reduce((sum, exp) => sum + exp.amount, 0);

    const pendingPayments = expenditures
      .filter(exp => exp.status === 'approved')
      .reduce((sum, exp) => sum + exp.amount, 0);

    // Calculate category breakdown
    const categoryBreakdown = budget.categories.map(category => {
      const categoryExpenses = expenditures
        .filter(exp => exp.budgetCategoryId === category.id && exp.status === 'paid')
        .reduce((sum, exp) => sum + exp.amount, 0);

      return {
        categoryName: category.name,
        allocated: category.allocatedAmount,
        spent: categoryExpenses,
        remaining: category.allocatedAmount - categoryExpenses,
        utilizationPercentage: category.allocatedAmount > 0 
          ? (categoryExpenses / category.allocatedAmount) * 100 
          : 0
      };
    });

    // Calculate vendor breakdown
    const vendorMap = new Map<string, { amount: number; count: number }>();
    expenditures
      .filter(exp => exp.vendor && exp.status === 'paid')
      .forEach(exp => {
        const vendor = exp.vendor!;
        const existing = vendorMap.get(vendor) || { amount: 0, count: 0 };
        vendorMap.set(vendor, {
          amount: existing.amount + exp.amount,
          count: existing.count + 1
        });
      });

    const topVendors = Array.from(vendorMap.entries())
      .map(([vendor, data]) => ({ 
        vendor, 
        amount: data.amount, 
        transactionCount: data.count 
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    // Calculate monthly spending
    const monthlySpending = this.calculateMonthlySpending(expenditures);

    // Calculate variance analysis
    const budgetVsActual = categoryBreakdown.map(cat => ({
      category: cat.categoryName,
      budgeted: cat.allocated,
      actual: cat.spent,
      variance: cat.allocated - cat.spent,
      variancePercentage: cat.allocated > 0 
        ? ((cat.allocated - cat.spent) / cat.allocated) * 100 
        : 0
    }));

    const revenue = fundraising.currentAmount;
    const expenses = totalSpent;
    const netProfit = revenue - expenses;
    const profitMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

    // Calculate cost per attendee (assuming attendees data is available)
    const costPerAttendee = totalSpent > 0 ? totalSpent / Math.max(1, 50) : 0; // Default 50 attendees

    // Calculate ROI
    const roi = expenses > 0 ? ((revenue - expenses) / expenses) * 100 : 0;

    return {
      eventId,
      fundraising: {
        targetAmount: fundraising.targetAmount,
        raisedAmount: fundraising.currentAmount,
        completionPercentage: (fundraising.currentAmount / fundraising.targetAmount) * 100,
        topDonationMethods: fundraising.fundraisingMethods
          .filter(method => method.amount > 0)
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 3)
          .map(method => ({
            method: method.method,
            amount: method.amount,
            count: fundraising.donations.filter(d => d.method === method.method).length
          }))
      },
      budget: {
        totalBudget: budget.totalBudget,
        allocatedAmount: budget.categories.reduce((sum, cat) => sum + cat.allocatedAmount, 0),
        remainingAmount: budget.totalBudget - totalSpent,
        categoryBreakdown
      },
      expenditure: {
        totalSpent,
        pendingPayments,
        averageTransactionAmount: expenditures.length > 0 ? totalSpent / expenditures.length : 0,
        topVendors,
        monthlySpending
      },
      profitLoss: {
        revenue,
        expenses,
        netProfit,
        profitMargin
      },
      variance: {
        budgetVsActual
      },
      costPerAttendee,
      roi
    };
  }

  /**
   * Generate financial report
   */
  generateReport(
    eventId: string, 
    reportType: 'summary' | 'detailed' | 'variance' | 'fundraising' | 'expenditure',
    generatedBy: string
  ): FinancialReport | null {
    const summary = this.generateFinancialSummary(eventId);
    if (!summary) return null;

    const insights = this.generateInsights(summary);

    return {
      id: this.generateId(),
      eventId,
      reportType,
      generatedDate: new Date(),
      generatedBy,
      dateRange: {
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        endDate: new Date()
      },
      data: summary,
      insights
    };
  }

  /**
   * Get all financial data for an event
   */
  getEventFinancialData(eventId: string) {
    return {
      fundraising: this.fundraisingData.get(eventId),
      budget: this.budgetData.get(eventId),
      expenditures: this.expenditureData.get(eventId) || [],
      summary: this.generateFinancialSummary(eventId)
    };
  }

  /**
   * Get default budget categories based on event type and total budget
   */
  private getDefaultBudgetCategories(totalBudget: number) {
    const baseCategories = [
      { name: 'Venue & Equipment', percentage: 0.30, priority: 'high' as const },
      { name: 'Food & Catering', percentage: 0.25, priority: 'high' as const },
      { name: 'Marketing & Promotion', percentage: 0.15, priority: 'medium' as const },
      { name: 'Speakers & Entertainment', percentage: 0.15, priority: 'medium' as const },
      { name: 'Materials & Supplies', percentage: 0.10, priority: 'low' as const },
      { name: 'Transportation', percentage: 0.05, priority: 'low' as const }
    ];

    return baseCategories.map(category => ({
      id: this.generateId(),
      name: category.name,
      allocatedAmount: totalBudget * category.percentage,
      description: `Budget allocation for ${category.name.toLowerCase()}`,
      priority: category.priority,
      items: []
    }));
  }

  /**
   * Calculate monthly spending breakdown
   */
  private calculateMonthlySpending(expenditures: EventExpenditure[]) {
    const monthlyMap = new Map<string, number>();
    
    expenditures
      .filter(exp => exp.status === 'paid')
      .forEach(exp => {
        const month = exp.date.toISOString().slice(0, 7); // YYYY-MM
        const existing = monthlyMap.get(month) || 0;
        monthlyMap.set(month, existing + exp.amount);
      });

    return Array.from(monthlyMap.entries())
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }

  /**
   * Generate insights based on financial data
   */
  private generateInsights(summary: EventFinancialSummary) {
    const insights = [];

    // Fundraising insights
    if (summary.fundraising.completionPercentage < 50) {
      insights.push({
        key: 'Low Fundraising Progress',
        value: `${summary.fundraising.completionPercentage.toFixed(1)}% of target reached`,
        trend: 'negative' as const,
        recommendation: 'Consider additional fundraising activities or marketing campaigns'
      });
    }

    // Budget utilization insights
    const overBudgetCategories = summary.budget.categoryBreakdown.filter(cat => cat.utilizationPercentage > 100);
    if (overBudgetCategories.length > 0) {
      insights.push({
        key: 'Budget Overrun',
        value: `${overBudgetCategories.length} categories over budget`,
        trend: 'negative' as const,
        recommendation: 'Review spending in over-budget categories and reallocate funds if necessary'
      });
    }

    // Profit margin insights
    if (summary.profitLoss.profitMargin < 0) {
      insights.push({
        key: 'Negative Profit Margin',
        value: `${summary.profitLoss.profitMargin.toFixed(1)}% profit margin`,
        trend: 'negative' as const,
        recommendation: 'Reduce expenses or increase fundraising to achieve profitability'
      });
    } else if (summary.profitLoss.profitMargin > 20) {
      insights.push({
        key: 'High Profit Margin',
        value: `${summary.profitLoss.profitMargin.toFixed(1)}% profit margin`,
        trend: 'positive' as const,
        recommendation: 'Consider investing surplus in event improvements or future events'
      });
    }

    return insights;
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

// Export singleton instance
export const financialService = new FinancialManagementService();
