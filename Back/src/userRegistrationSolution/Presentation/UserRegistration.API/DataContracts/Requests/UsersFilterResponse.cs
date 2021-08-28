using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserRegistration.API.DataContracts.Requests
{
    public class UsersFilterResponse
    {
        public string Name { get; set; }
        public bool Active { get; set; }
    }
}
