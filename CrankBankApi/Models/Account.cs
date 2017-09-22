using CrankBankApi.Enums;

namespace CrankBankApi.Models
{
  public class Account
  {
    public AccountType Id { get; set; }
    public string Name { get; set; }
    public double Balance { get; set; }
  }
}
