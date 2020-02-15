using System;
using Amazon;
using Amazon.SecretsManager;
using Amazon.SecretsManager.Model;
using Microsoft.Extensions.Configuration;

namespace DataAccessLibrary
{
    public class GetSecretsManager : ConfigurationProvider
    {
        public static string GetSecretValue(string secretId)
        {
            string envValue = Environment.GetEnvironmentVariable(secretId);
            if (!(string.IsNullOrEmpty(envValue)))
            {
                return envValue;
            }
            using (IAmazonSecretsManager client = new AmazonSecretsManagerClient(RegionEndpoint.USEast1))
            {
                var request = new GetSecretValueRequest()
                {
                    SecretId = secretId
                };

                var response = client.GetSecretValueAsync(request).Result;

                return response.SecretString;
            }
        }
    }
}