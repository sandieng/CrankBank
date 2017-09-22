using CrankBankApi.Enums;

namespace CrankBankApi.Models
{
  public class AccountUpdate
    {
    public AccountType AccountId { get; set; }
    public double Amount { get; set; }
    }
}
