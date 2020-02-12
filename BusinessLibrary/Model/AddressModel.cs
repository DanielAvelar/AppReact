namespace BusinessLibrary.Model
{
    public class AddressModel
    {
        public int AddressId { get; set; }
        public string Street { get; set; }
        public int Number { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public int Fk_PersonId { get; set; }
        public PersonModel Person { get; set; }
    }
}