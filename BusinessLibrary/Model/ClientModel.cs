namespace BusinessLibrary.Model
{
    public class ClientModel
    {
        private int? _number;
        private int? _addressId;

        public int PersonId { get; set; }
        public string Cpf { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        public int? AddressId { get => _addressId; set => _addressId = value; }
        public string Street { get; set; }
        public int? Number { get => _number; set => _number = value; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }
}