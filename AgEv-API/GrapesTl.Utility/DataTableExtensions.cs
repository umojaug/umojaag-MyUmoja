using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;

namespace GrapesTl.Utility
{
    public static class DataTableExtensions
    {
        public static DataTable ToDataTable<T>(this List<T> data, List<string> columnsToInclude = null)
        {
            var table = new DataTable(typeof(T).Name);
            var properties = TypeDescriptor.GetProperties(typeof(T));
            var includedProperties = properties.Cast<PropertyDescriptor>();

            //optional filtering of columns
            if (columnsToInclude != null && columnsToInclude.Any())
            {
                includedProperties = properties.Cast<PropertyDescriptor>()
                                             .Where(p => columnsToInclude.Contains(p.Name, StringComparer.OrdinalIgnoreCase));
            }

            // Add all properties as columns
            foreach (PropertyDescriptor property in includedProperties)
            {
                table.Columns.Add(property.Name, Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType);
            }

            foreach (T item in data)
            {
                var row = table.NewRow();
                foreach (PropertyDescriptor property in includedProperties)
                {
                    row[property.Name] = property.GetValue(item) ?? DBNull.Value;
                }
                table.Rows.Add(row);
            }

            return table;
        }
    }
}