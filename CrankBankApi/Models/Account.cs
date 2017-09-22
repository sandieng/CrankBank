using CrankBankApi.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrankBankApi.Models
{
  public class Account
  {
    public AccountType Id { get; set; }
    public string Name { get; set; }
    public double Balance { get; set; }
  }
}
