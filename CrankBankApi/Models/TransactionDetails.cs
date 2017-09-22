using CrankBankApi.Enums;
using System;

namespace CrankBankApi.Models
{
  public class TransactionDetails
    {
    public AccountType AccountId { get; set; }
    public int TransactionId { get; set; }
    public DateTime TransactionDate { get; set; }
    public double TransactionAmount { get; set; }
    public string Note { get; internal set; }
  }
}
