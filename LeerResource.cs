namespace BlijvenLeren
{
    public class LeerResource
    {
        public LeerResource(int id, string naam, string omschrijving)
        {
            Id = id;
            Naam = naam;
            Omschrijving = omschrijving;
        }

        public int Id { get; private set; }
        public string Naam { get; private set; }
        public string Omschrijving { get; private set; }
    }
}
