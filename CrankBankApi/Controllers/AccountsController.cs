using CrankBankApi.Enums;
using CrankBankApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace CrankBankApi.Controllers
{
  [Produces("application/json")]
  [Route("api/Accounts")]
  [EnableCors("MyPolicy")]
  public class AccountsController : Controller
  {
    private static List<Account> _accounts = new List<Account>();

    static AccountsController()
    {
      _accounts.Add(new Account { Id = AccountType.SavingsAccount, Name = "Savings Account", Balance = 1000.00 });
      _accounts.Add(new Account { Id = AccountType.ChequeAccount, Name = "Cheque Account", Balance = 500.00 });
      _accounts.Add(new Account { Id = AccountType.CreditAccount, Name = "Credit Account", Balance = 300.00 });
    }

    [HttpGet]
    public IEnumerable<Account> Get()
    {
      return _accounts;
    }

    [HttpGet("{accountId}")]
    public Account Get(AccountType accountId)
    {
      return _accounts.SingleOrDefault(x => x.Id == accountId);
    }

    [HttpPost]
    public ActionResult Post([FromBody] AccountUpdate updateDetails)
    {
      var targetAccount = _accounts.SingleOrDefault(x => x.Id == updateDetails.AccountId);

      if (targetAccount != null)
      {
        targetAccount.Balance += updateDetails.Amount;
      }

      return Ok(targetAccount);
    }
  }
}
