using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLibrary.EntityModels
{
    public partial class Address
    {
        public int AddressId { get; set; }
        public string Street { get; set; }
        public int Number { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        [Key, ForeignKey("Person")]
        public int Fk_PersonId { get; set; }
        public Person Person { get; set; }
    }
}
