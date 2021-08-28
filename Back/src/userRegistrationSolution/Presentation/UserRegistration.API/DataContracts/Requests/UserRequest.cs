using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserRegistration.API.DataContracts.Requests
{
    public class UserRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Date BirthDate { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public bool Active { get; set; }
    }
}
