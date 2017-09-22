using CrankBankApi.Enums;

namespace CrankBankApi.Models
{
  public class TransferDetails
  {
    public AccountType FromAccountId { get; set; }
    public AccountType ToAccountId { get; set; }
    public double Amount { get; set; }
    public string TransferNote { get; set; }
  }
}
