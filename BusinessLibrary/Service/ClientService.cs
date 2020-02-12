using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public class ClientService : IClientService
    {
        public async Task<List<PersonModel>> GetPerson()
        {
            using (DBContext db = new DBContext())
            {
                return await (from a in db.Person.AsNoTracking()
                              select new PersonModel
                              {
                                  PersonId = a.PersonId,
                                  Cpf = a.Cpf,
                                  FirstName = a.FirstName,
                                  LastName = a.LastName,
                                  Email = a.Email,
                                  Phone = a.Phone
                              }).ToListAsync();
            }
        }

        public async Task<bool> SavePerson(PersonModel personModel)
        {
            using (DBContext db = new DBContext())
            {
                DataAccessLibrary.EntityModels.Person person = db.Person.Where
                         (x => x.PersonId == personModel.PersonId).FirstOrDefault();
                if (person == null)
                {
                    person = new Person()
                    {
                        Cpf = personModel.Cpf,
                        FirstName = personModel.FirstName,
                        LastName = personModel.LastName,
                        Email = personModel.Email,
                        Phone = personModel.Phone
                    };
                    db.Person.Add(person);

                }
                else
                {
                    person.Cpf = personModel.Cpf;
                    person.FirstName = personModel.FirstName;
                    person.LastName = personModel.LastName;
                    person.Email = personModel.Email;
                    person.Phone = personModel.Phone;
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeletePerson(int personId)
        {
            using (DBContext db = new DBContext())
            {
                DataAccessLibrary.EntityModels.Person person = db.Person.Where(x => x.PersonId == personId).FirstOrDefault();
                if (person != null)
                {
                    db.Person.Remove(person);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }

        public Task<List<AddressModel>> GetAddress()
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> SaveAddress(AddressModel person)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> DeleteAddress(int personId)
        {
            throw new System.NotImplementedException();
        }
    }
}