using GR.Frameworks.a.b.c.d;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;


namespace GR.Frameworks
{
    /// <summary>
    /// http://stackoverflow.com/questions/17113113/interop-encryption-decryption-between-java-net-with-aes-and-specifying-iv-and-ke
    /// </summary>
    public class SimpleInteroperableEncryption
    {
        private string salt { get; set; }
        
        private byte[] passWord = Constantes.key;// "p@$$W0rDC0RP0R4C10NS3rv1c10sGR";

        public SimpleInteroperableEncryption(string ClavePublica)
        {
            this.salt = ClavePublica;
        }

        public string Encrypt(string raw)
        {
            if (String.IsNullOrEmpty(this.salt))
                throw new Exception("SALT debe tener un valor");
            using (var csp = new AesCryptoServiceProvider())
            {
                ICryptoTransform e = GetCryptoTransform(csp, true);
                byte[] inputBuffer = Encoding.UTF8.GetBytes(raw);
                byte[] output = e.TransformFinalBlock(inputBuffer, 0, inputBuffer.Length);

                string encrypted = Convert.ToBase64String(output);

                return encrypted;
            }
        }

        public string Decrypt(string encrypted)
        {
            if (String.IsNullOrEmpty(this.salt))
                throw new Exception("SALT debe tener un valor");
            using (var csp = new AesCryptoServiceProvider())
            {
                var d = GetCryptoTransform(csp, false);
                byte[] output = Convert.FromBase64String(encrypted);
                byte[] decryptedOutput = d.TransformFinalBlock(output, 0, output.Length);

                string decypted = Encoding.UTF8.GetString(decryptedOutput);
                return decypted;
            }
        }

        private ICryptoTransform GetCryptoTransform(AesCryptoServiceProvider csp, bool encrypting)
        {
            csp.Mode = CipherMode.CBC;
            csp.Padding = PaddingMode.PKCS7;


            //a random Init. Vector. just for testing
            String iv = "e675f725e675f725";
            int iteraciones = 65536;
            byte[] pw = passWord;//Encoding.UTF8.GetBytes(passWord);
            var spec = new Rfc2898DeriveBytes(pw, Encoding.UTF8.GetBytes(salt), iteraciones);
            byte[] key = spec.GetBytes(16);


            csp.IV = Encoding.UTF8.GetBytes(iv);
            csp.Key = key;
            if (encrypting)
            {
                return csp.CreateEncryptor();
            }
            return csp.CreateDecryptor();
        }
    }
}
