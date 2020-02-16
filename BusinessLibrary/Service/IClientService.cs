using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IClientService
    {
        Task<List<ClientModel>> GetAll();

        Task<List<PersonModel>> GetPerson();
        Task<PersonModel> SavePerson(PersonModel person);
        Task<bool> DeletePerson(int personId);

        Task<List<AddressModel>> GetAddress();
        Task<bool> SaveAddress(AddressModel person);
        Task<bool> DeleteAddress(int personId);
    }
}
