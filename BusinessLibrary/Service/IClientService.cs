using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IClientService
    {
        Task<List<PersonModel>> GetPerson();
        Task<bool> SavePerson(PersonModel person);
        Task<bool> DeletePerson(int personId);

        Task<List<AddressModel>> GetAddress();
        Task<bool> SaveAddress(AddressModel person);
        Task<bool> DeleteAddress(int personId);
    }
}
