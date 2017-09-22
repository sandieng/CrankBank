using CrankBankApi.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrankBankApi.Models
{
    public class AccountUpdate
    {
    public AccountType AccountId { get; set; }
    public double Amount { get; set; }
    }
}
