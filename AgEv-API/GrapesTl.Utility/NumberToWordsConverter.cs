using System;
namespace GrapesTl.Utility;
public static class NumberToWordsConverter
{
    public static string ConvertAmountToWords(double amount)
    {
        if (amount == 0) return $"{SD.Currency} Zero";

        string[] ones = { "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
                      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
                      "Seventeen", "Eighteen", "Nineteen" };

        string[] tens = { "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety" };

        string[] thousands = { "", "Thousand", "Million", "Billion" };

        if (amount < 0) return "Minus " + ConvertAmountToWords(Math.Abs(amount));

        string words = "";
        int groupIndex = 0;
        long wholeAmount = (long)Math.Floor(amount);

        while (wholeAmount > 0)
        {
            int group = (int)(wholeAmount % 1000);
            if (group != 0)
            {
                string groupWords = ConvertGroupToWords(group, ones, tens);
                if (!string.IsNullOrEmpty(groupWords))
                {
                    words = groupWords + " " + thousands[groupIndex] + " " + words;
                }
            }
            wholeAmount /= 1000;
            groupIndex++;
        }

        return $"({SD.Currency}) " + words.Trim();
    }

    private static string ConvertGroupToWords(int number, string[] ones, string[] tens)
    {
        string result = "";

        if (number >= 100)
        {
            result += ones[number / 100] + " Hundred ";
            number %= 100;
        }

        if (number >= 20)
        {
            result += tens[number / 10] + " ";
            number %= 10;
        }

        if (number > 0)
        {
            result += ones[number] + " ";
        }

        return result.Trim();
    }
}
