using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AppSage.Controllers;
using BusinessLibrary.Model;
using BusinessLibrary.Service;
using DataAccessLibrary.EntityModels;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class ClientController : BaseController<ClientController>
    {
        private readonly IClientService _clientService;
        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet]
        [Route("People")]
        public async Task<IActionResult> People()
        {
            List<PersonModel> response = new List<PersonModel>();

            try
            {
                response = await _clientService.GetPerson();
            }
            catch (Exception ex)
            {
                return CreateServerErrorResponse(ex, null);
            }
            return CreateResponse(response);
        }

        [HttpPost]
        [Route("SavePerson")]
        public async Task<IActionResult> SavePerson([FromBody] PersonModel model)
        {
            PersonModel response;

            try
            {
                response = await _clientService.SavePerson(model);
            }
            catch (Exception ex)
            {
                return CreateServerErrorResponse(ex, null);
            }
            return CreateResponse(response);
        }

        [HttpDelete]
        [Route("DeletePerson/{personId}")]
        public async Task<IActionResult> DeletePerson(int personId)
        {
            bool response;

            try
            {
                response = await _clientService.DeletePerson(personId);
            }
            catch (Exception ex)
            {
                return CreateServerErrorResponse(ex, null);
            }
            return CreateResponse(response);
        }

        [HttpGet]
        [Route("Addresses")]
        public async Task<IActionResult> Addresses()
        {
            List<AddressModel> response = new List<AddressModel>();

            try
            {
                response = await _clientService.GetAddress();
            }
            catch (Exception ex)
            {
                return CreateServerErrorResponse(ex, null);
            }
            return CreateResponse(response);
        }

        [HttpPost]
        [Route("SaveAddress")]
        public async Task<IActionResult> SaveAddress([FromBody] AddressModel model)
        {
            bool response;

            try
            {
                response = await _clientService.SaveAddress(model);
            }
            catch (Exception ex)
            {
                return CreateServerErrorResponse(ex, null);
            }
            return CreateResponse(response);
        }

        [HttpDelete]
        [Route("DeleteAddress/{addressId}")]
        public async Task<IActionResult> DeleteAddress(int addressId)
        {
            bool response;

            try
            {
                response = await _clientService.DeleteAddress(addressId);
            }
            catch (Exception ex)
            {
                return CreateServerErrorResponse(ex, null);
            }
            return CreateResponse(response);
        }
    }
}
