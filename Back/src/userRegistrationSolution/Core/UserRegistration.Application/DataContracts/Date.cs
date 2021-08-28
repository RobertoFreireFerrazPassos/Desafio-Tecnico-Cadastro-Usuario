using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserRegistration.API.Models
{
    public class Date
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
        public override string ToString() => Day + "/" + Month + "/" + Year;
    }
}
