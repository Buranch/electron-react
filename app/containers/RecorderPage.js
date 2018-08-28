import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Recorder from '../components/Recorder';
import * as CounterActions from '../actions';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recorder);
