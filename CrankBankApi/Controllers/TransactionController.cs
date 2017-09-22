using CrankBankApi.Enums;
using CrankBankApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;

namespace CrankBankApi.Controllers
{
  [Produces("application/json")]
  [Route("api/Transaction")]
  [EnableCors("MyPolicy")]
  public class TransactionController : Controller
  {
    private static List<TransactionDetails> _transactionDetails = new List<TransactionDetails>();
    private const string ACCOUNT_BASE_URL = "http://localhost:10631/api/accounts";

    static TransactionController()
    {
      _transactionDetails.Add(new TransactionDetails { AccountId = AccountType.SavingsAccount, TransactionId = 1, TransactionDate = new DateTime(2017, 9, 1), TransactionAmount = 100, Note = "Salary" });
      _transactionDetails.Add(new TransactionDetails { AccountId = AccountType.SavingsAccount, TransactionId = 1, TransactionDate = new DateTime(2017, 9, 1), TransactionAmount = 50, Note = "Dividend" });
      _transactionDetails.Add(new TransactionDetails { AccountId = AccountType.SavingsAccount, TransactionId = 1, TransactionDate = new DateTime(2017, 9, 1), TransactionAmount = -80, Note = "Groceries" });

      _transactionDetails.Add(new TransactionDetails { AccountId = AccountType.ChequeAccount, TransactionId = 1, TransactionDate = new DateTime(2017, 9, 1), TransactionAmount = 75, Note = "Overtime" });
      _transactionDetails.Add(new TransactionDetails { AccountId = AccountType.ChequeAccount, TransactionId = 1, TransactionDate = new DateTime(2017, 9, 1), TransactionAmount = -100, Note = "Birthday gift" });
      _transactionDetails.Add(new TransactionDetails { AccountId = AccountType.ChequeAccount, TransactionId = 1, TransactionDate = new DateTime(2017, 9, 1), TransactionAmount = -90, Note = "Car insurance" });

      _transactionDetails.Add(new TransactionDetails { AccountId = AccountType.CreditAccount, TransactionId = 1, TransactionDate = new DateTime(2017, 9, 1), TransactionAmount = -20, Note = "Groceries" });
      _transactionDetails.Add(new TransactionDetails { AccountId = AccountType.CreditAccount, TransactionId = 1, TransactionDate = new DateTime(2017, 9, 1), TransactionAmount = -90, Note = "Petrol" });
      _transactionDetails.Add(new TransactionDetails { AccountId = AccountType.CreditAccount, TransactionId = 1, TransactionDate = new DateTime(2017, 9, 1), TransactionAmount = 200, Note = "Refund computer monitor" });
    }

    [HttpGet]
    public IEnumerable<TransactionDetails> Get()
    {
      return _transactionDetails;
    }

    [HttpGet("{accountId}")]
    public IEnumerable<TransactionDetails> Get(AccountType accountId)
    {
      return _transactionDetails.Where(x => x.AccountId == accountId);
    }

    [HttpPost]
    public ActionResult Post([FromBody] TransferDetails transferAccount)
    {
      CreateTransactionEntry(transferAccount.FromAccountId, transferAccount.Amount * -1, transferAccount.TransferNote);
      CreateTransactionEntry(transferAccount.ToAccountId, transferAccount.Amount, transferAccount.TransferNote);

      using (var client = new HttpClient())
      {
        // Update from account
        var updateFromAccount = new AccountUpdate
        {
          AccountId = transferAccount.FromAccountId,
          Amount = transferAccount.Amount * -1
        };

        var content = new StringContent(JsonConvert.SerializeObject(updateFromAccount), Encoding.UTF8, "application/json");
        HttpResponseMessage fromResponse = client.PostAsync(ACCOUNT_BASE_URL, content).Result;

        // Update to account
        var updateToAccount = new AccountUpdate
        {
          AccountId = transferAccount.ToAccountId,
          Amount = transferAccount.Amount
        };

        content = new StringContent(JsonConvert.SerializeObject(updateToAccount), Encoding.UTF8, "application/json");
        HttpResponseMessage toResponse = client.PostAsync(ACCOUNT_BASE_URL, content).Result;
      }

      return Ok(true);
    }

    private void CreateTransactionEntry(AccountType accountId, double amount, string transferNote)
    {
      var targetAccount = _transactionDetails.LastOrDefault(x => x.AccountId == accountId);

      var newEntry = new TransactionDetails
      {
        AccountId = accountId,
        TransactionId = ++targetAccount.TransactionId,
        TransactionDate = new DateTime(),
        TransactionAmount = amount,
        Note = transferNote
      };

      _transactionDetails.Add(newEntry);
    }
  }
}
