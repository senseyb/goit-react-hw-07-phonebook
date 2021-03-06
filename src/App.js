import React, { Component } from 'react';
import ContactForm from './Component/ContactForm/ContactForm';
import ContactList from './Component/ContactList/ContactList';
import Filter from './Component/Filter/Filter';
import appActions from './redux/app/app-actions';
import appOperations from './redux/app/app-operations';
import { connect } from 'react-redux';
import selectors from './redux/app/contacts-selectors';

class App extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    console.log(this.props.contacts);
    console.log(this.props.filter);
    console.log(this.props.visibleArray);

    return (
      <div className="App">
        <h1>Phonebook</h1>
        {this.props.isLoadingContacts && <h2>Loading ...</h2>}
        <ContactForm onSubmitData={this.props.formSubmitHandler} />
        <h1>Contacts</h1>
        <Filter setFilterToState={this.props.filterSet} />
        <ContactList
          contacts={this.props.visibleArray}
          del={this.props.contactDelete}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isLoadingContacts: selectors.getIsLoading(state),
  contacts: selectors.getContacts(state),
  filter: selectors.getFilter(state),
  visibleArray: selectors.getVisibleFilterArray(state),
});

const mapDispatchToProrps = dispatch => ({
  fetchContacts: () => dispatch(appOperations.fetchContacts()),
  formSubmitHandler: contactData =>
    dispatch(appOperations.addContact(contactData)),
  contactDelete: contactId => dispatch(appOperations.deleteContact(contactId)),
  filterSet: str => dispatch(appActions.filterSet(str)),
});
export default connect(mapStateToProps, mapDispatchToProrps)(App);
