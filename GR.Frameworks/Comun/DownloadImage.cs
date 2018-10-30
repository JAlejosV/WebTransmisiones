using GR.Frameworks;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace GR.Frameworks
{
    public class DownloadImage
    {
        private string imageUrl;
        private Bitmap bitmap;
        public DownloadImage(string imageUrl, string filename)
        {
            this.imageUrl = imageUrl;
            this.FileName = filename;
        }

        public static string Save2(string url, string saveloc)
        {

            using (MyWebClient wc = new MyWebClient())
            {
                wc.Headers.Add("Content-Type", "image/jpeg");
                byte[] fileBytes = wc.DownloadData(url);

                string fileType = wc.ResponseHeaders[HttpResponseHeader.ContentType];

                if (fileType != null)
                {
                    switch (fileType)
                    {
                        case "image/jpeg":
                            saveloc += ".jpg";
                            break;
                        case "image/gif":
                            saveloc += ".gif";
                            break;
                        case "image/png":
                            saveloc += ".png";
                            break;
                        default:
                            break;
                    }

                    System.IO.File.WriteAllBytes(saveloc, fileBytes);
                }
            }
            return saveloc;
        }

        public void Download()
        {
            try
            {
                if (File.Exists(this.FileName))
                {
                    bitmap = new Bitmap(this.FileName);
                }
                else
                {
                    using (MyWebClient client = new MyWebClient())
                    {
                        Stream stream = client.OpenRead(imageUrl);
                        bitmap = new Bitmap(stream);
                        stream.Flush();
                        stream.Close();
                    }
                    this.SaveImage(this.FileName, ImageFormat.Png);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
        public Bitmap GetImage()
        {
            return bitmap;
        }
        public string Get64Bits()
        {
            return ConvertirImagenAString64(bitmap, ImageFormat.Png);
        }
        public String FileName { get; set; }
        public void SaveImage(string filename, ImageFormat format)
        {
            if (bitmap != null)
            {
                this.FileName = filename;
                bitmap.Save(filename);
            }
        }

        public static string ConvertirImagenAString64(Bitmap imagen, ImageFormat imagenFormat = null)
        {
            if (imagenFormat == null)
                imagenFormat = ImageFormat.Bmp;
            string bitmapString = null;       // Conversion from image to string
            try
            {
                byte[] bitmapBytes = ImageToByteArray(imagen);
                bitmapString = Convert.ToBase64String(bitmapBytes, Base64FormattingOptions.None); // Conversion from image to string end
            }
            catch
            {
                throw new Exception("Error al convertir a String 64");
            }
            return bitmapString;

        }
        public static byte[] ImageToByteArray(Bitmap img)
        {
            byte[] byteArray = new byte[0];
            using (MemoryStream stream = new MemoryStream())
            {
                img.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                stream.Close();

                byteArray = stream.ToArray();
            }
            return byteArray;
        }
    }
}