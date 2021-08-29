using System;

namespace UserRegistration.Application.DataContracts.Requests
{
    public class UserToggleactivationRequest
    {
        public Guid Id { get; set; }
        public bool Active { get; set; }
    }
}
