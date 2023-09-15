export const formParts = [
  {
    partName: 'Part 1. Information About You (Person applying for lawful permanent residence)',
    groups: [
    {
      groupName: 'Your Current Legal Name (do not provide a nickname)',
      fields: [
        { id: 'lastName', label: '1.a. Family Name (Last Name)', name: 'Pt1Line1a_FamilyName[0]', type: 'text' },
        { id: 'firstName', label: '1.b. Given Name (First Name)', name: 'Pt1Line1b_GivenName[0]', type: 'text' },
        { id: 'middleName', label: '1.c. Middle Name', name: 'Pt1Line1c_MiddleName[0]', type: 'text' }

      ]
    },
    {
      groupName: 'Other Names You Have Used Since Birth (if applicable)',
      note: 'NOTE: Provide all other names you have ever used, including your family name at birth, other legal names, nicknames, aliases, and assumed names. If you need extra space to complete this section, use the space provided in Part 14. Additional Information.',
      fields: [
        { id: 'lastName', label: '2.a. Family Name (Last Name)', name: 'Pt1Line2a_FamilyName[0]', type: 'text' },
        { id: 'firstName', label: '2.b. Given Name (First Name)', name: 'Pt1Line2b_GivenName[0]', type: 'text' },
        { id: 'middleName', label: '2.c. Middle Name', name: 'Pt1Line2c_MiddleName[0]', type: 'text' },
        { id: 'lastName', label: '3.a. Family Name (Last Name)', name: 'Pt1Line3a_FamilyName[0]', type: 'text' },
        { id: 'firstName', label: '3.b. Given Name (First Name)', name: 'Pt1Line3b_GivenName[0]', type: 'text' },
        { id: 'middleName', label: '3.c. Middle Name', name: 'Pt1Line3c_MiddleName[0]', type: 'text' },
        { id: 'lastName', label: '4.a. Family Name (Last Name)', name: 'Pt1Line4a_FamilyName[0]', type: 'text' },
        { id: 'firstName', label: '4.b. Given Name (First Name)', name: 'Pt1Line4b_GivenName[0]', type: 'text' },
        { id: 'middleName', label: '4.c. Middle Name', name: 'Pt1Line4c_MiddleName[0]', type: 'text' }

      ]
    },
     {
       groupName: 'Other Information About You',
       note: 'NOTE: In addition to providing your actual date of birth, include any other dates of birth you have used in connection with any legal names or non-legal names in the space provided in Part 14. Additional Information.',
       fields: [
         { id: 'dob', label: '5. Date of Birth (mm/dd/yyyy)', name: 'Pt1Line5_DateofBirth[0]', type: 'date' },
         { id: 'gender', label: '6. Sex', name: 'gender', type: 'radio' },
         { id: 'cityOfBirth', label: '7. City of Town of Birth', name: 'Pt1Line6_CityOrTown[0]', type: 'text' }

       ]
     }
  ]
}
];
