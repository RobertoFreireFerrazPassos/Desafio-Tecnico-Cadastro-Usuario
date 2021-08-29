using System;

namespace UserRegistration.API.DataContracts.Requests
{
    public class UserToggleactivationRequest
    {
        public Guid Id { get; set; }
        public bool Active { get; set; }
    }
}
