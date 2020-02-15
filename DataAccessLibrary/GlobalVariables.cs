using DataAccessLibrary;

namespace AppSage
{
    public class GlobalVariables
    {
        private static string _postgresqlConnection;

        public static string PostresqlConnection
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_postgresqlConnection))
                {
                    _postgresqlConnection = GetSecretsManager.GetSecretValue("POSTGRESQL_CONNECTION");
                }

                return _postgresqlConnection;
            }

            private set
            {
                _postgresqlConnection = value;
            }
        }
    }
}
