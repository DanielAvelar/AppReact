using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;

namespace BusinessLibrary.Service
{
    public class ClientService : IClientService
    {
        public async Task<List<ClientModel>> GetAll()
        {
            using (DBContext db = new DBContext())
            {
                return await (from p in db.Person
                             join a in db.Address
                                 on p.PersonId equals a.Fk_PersonId into ap
                              from x in ap.DefaultIfEmpty()
                              select new ClientModel
                             {
                                PersonId = p.PersonId,
                                Cpf = p.Cpf,
                                FirstName = p.FirstName,
                                LastName = p.LastName,
                                Email = p.Email,
                                Phone = p.Phone,
                                AddressId = x.AddressId,
                                Street = x.Street ?? "",
                                Number = x.Number,
                                City = x.City ?? "",
                                State = x.State ?? "",
                                Country = x.Country ?? ""
                             }).ToListAsync();
            }
        }

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

        public async Task<PersonModel> SavePerson(PersonModel personModel)
        {
            PersonModel response = new PersonModel();

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

                await db.SaveChangesAsync();

                response.PersonId = person.PersonId;
                response.Cpf = person.Cpf;
                response.FirstName = person.FirstName;
                response.LastName = person.LastName;
                response.Email = person.Email;
                response.Phone = person.Phone;

                return response;
            }
        }

        public async Task<bool> DeletePerson(int personId)
        {
            using (DBContext db = new DBContext())
            {
                Person person = db.Person.Where(x => x.PersonId == personId).FirstOrDefault();
                Address address = db.Address.Where(x => x.Fk_PersonId == personId).FirstOrDefault();
                if (address != null)
                {
                    db.Address.Remove(address);
                }
                if (person != null)
                {
                    db.Person.Remove(person);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<List<AddressModel>> GetAddress()
        {
            using (DBContext db = new DBContext())
            {
                return await (from a in db.Address.AsNoTracking()
                              select new AddressModel
                              {
                                  AddressId = a.AddressId,
                                  Street = a.Street,
                                  Number = a.Number,
                                  City = a.City,
                                  State = a.State,
                                  Country = a.Country
                              }).ToListAsync();
            }
        }

        public async Task<bool> SaveAddress(AddressModel addressModel)
        {
            using (DBContext db = new DBContext())
            {
                DataAccessLibrary.EntityModels.Address address = db.Address.Where
                         (x => x.AddressId == addressModel.AddressId).FirstOrDefault();
                if (address == null)
                {
                    address = new Address()
                    {
                        Street = addressModel.Street,
                        Number = addressModel.Number,
                        City = addressModel.City,
                        State = addressModel.State,
                        Country = addressModel.Country,
                        Fk_PersonId = addressModel.Fk_PersonId
                    };
                    db.Address.Add(address);

                }
                else
                {
                    address.Street = addressModel.Street;
                    address.Number = addressModel.Number;
                    address.City = addressModel.City;
                    address.State = addressModel.State;
                    address.Country = addressModel.Country;
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteAddress(int addressId)
        {
            using (DBContext db = new DBContext())
            {
                DataAccessLibrary.EntityModels.Address address = db.Address.Where(x => x.AddressId == addressId).FirstOrDefault();
                if (address != null)
                {
                    db.Address.Remove(address);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }
    }
}