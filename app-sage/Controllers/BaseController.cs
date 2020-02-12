using System;
using System.Net;
using DataAccessLibrary;
using Microsoft.AspNetCore.Mvc;

namespace AppSage.Controllers
{
    public abstract class BaseController<TController> : ControllerBase
    {
        protected readonly string _requestId;

        public BaseController()
        {
            _requestId = Guid.NewGuid().ToString();
        }

        private IActionResult MakeResponse(IActionResult result)
        {
            Response.Headers.Add("X-Request-Id", _requestId);
            return result;
        }
        protected IActionResult CreateResponse<T>(T dto)
        {
            IActionResult response = null;
            if (dto != null)
            {
                response = Ok(dto);
            }
            else
            {
                response = NotFound();
            }
            return MakeResponse(response);
        }
        protected IActionResult CreateServerErrorResponse(Exception ex, int? statusCode)
        {
            int status = statusCode != null ? statusCode.GetHashCode() : HttpStatusCode.InternalServerError.GetHashCode();

            return MakeResponse(StatusCode(
                status,
                new ErrorResponse()
                {
                    Status = status,
                    Message = $"{_requestId} :: {ex.Message}"
                }
            ));
        }
    }
}