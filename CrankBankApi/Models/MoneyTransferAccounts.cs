using CrankBankApi.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
