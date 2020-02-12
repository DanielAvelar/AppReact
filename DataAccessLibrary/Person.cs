using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLibrary.EntityModels
{
    public partial class Person
    {
        [Key]
        public int PersonId { get; set; }
        public string Cpf { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        public Address Address { get; set; }
    }
}
