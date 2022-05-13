using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerenceAPI.Errors;
using Microsoft.AspNetCore.Mvc;

namespace ecommerenceAPI.Controllers
{
    [Route("errors/{code}")]
    [ApiExplorerSettings(IgnoreApi =true)]
    public class ErrorController : BaseApiController
    {
       public IActionResult Error(int code) 
       {
           return new ObjectResult(new ApiResponse(code));
       }
    }
}