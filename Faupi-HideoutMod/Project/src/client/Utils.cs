using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using System;
using System.Text.RegularExpressions;
using UnityEngine;

namespace HideoutArchitect
{
    public static class Utils
    {
        public static string ToSentenceCase(this string text)
        {
            string result = text;
            try
            {
                // start by converting entire string to lower case
                var lowerCase = text.ToLower();
                // matches the first sentence of a string, as well as subsequent sentences
                var r = new Regex(@"(^[a-z])|\.\s+(.)", RegexOptions.ExplicitCapture);
                // MatchEvaluator delegate defines replacement of setence starts to uppercase
                result = r.Replace(lowerCase, s => s.Value.ToUpper());
            }
            catch (Exception ex)
            {
                Debug.LogError($"Error converting string case for '{text}': {ex}");
            }

            return result;
        }

        public static bool IsValidHexColor(this string inputColor)
        {
            //Taken from https://stackoverflow.com/a/13035186
            if (Regex.Match(inputColor, "^#(?:[0-9a-fA-F]{3}){1,2}$").Success)
                return true;

            var result = System.Drawing.Color.FromName(inputColor);
            return result.IsKnownColor;
        }

        public static bool IsValidJson(this string strInput)
        {
            if (string.IsNullOrWhiteSpace(strInput)) { return false; }
            strInput = strInput.Trim();
            if ((strInput.StartsWith("{") && strInput.EndsWith("}")) || //For object
                (strInput.StartsWith("[") && strInput.EndsWith("]"))) //For array
            {
                try
                {
                    var obj = JToken.Parse(strInput);
                    return true;
                }
                catch (JsonReaderException jex)
                {
                    //Exception in parsing json
                    Debug.LogError(jex.Message);
                    return false;
                }
                catch (Exception ex) //some other exception
                {
                    Debug.LogError(ex.ToString());
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public class StringEnumCommentConverter : StringEnumConverter
        {
            //modification of https://stackoverflow.com/a/65001212
            private readonly string _comment;
            public StringEnumCommentConverter(string comment)
            {
                _comment = comment;
            }

            public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
            {
                base.WriteJson(writer, value, serializer);
                writer.WriteComment(_comment); // append comment
            }
        }

        public class JsonCommentConverter : JsonConverter
        {
            //modification of https://stackoverflow.com/a/65001212
            private readonly string _comment;
            public JsonCommentConverter(string comment)
            {
                _comment = comment;
            }

            public override object ReadJson(JsonReader reader, Type objectType, object existingValue,
            JsonSerializer serializer)
            {
                throw new NotImplementedException();
            }

            public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
            {
                writer.WriteValue(value);
                writer.WriteComment(_comment); // append comment
            }

            public override bool CanConvert(Type objectType) => true;
            public override bool CanRead => false;
        }
    }
}
