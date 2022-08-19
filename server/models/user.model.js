class UserModel {
  /**
   * @param {string} id
   * @param {string} email
   * @param {string} username
   * @param {string} password
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} city
   * @param {string} street
   * @param {Number} teudatZehut
   * @param {'Admin'|'Customer'} role
   */

  constructor({
    email,
    username,
    firstName,
    lastName,
    city,
    street,
    teudatZehut,
    password,
    _id,
    role,
  }) {
    this.email = email;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = _id;
    this.city = city;
    this.street = street;
    this.teudatZehut = teudatZehut;
    this.password = password;
    this.role = role;
  }
}

export default UserModel;
