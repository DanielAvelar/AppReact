namespace BusinessLibrary.Model
{
    public class PersonModel
    {
        public int PersonId { get; set; }
        public string Cpf { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        public AddressModel Address { get; set; }
    }
}
