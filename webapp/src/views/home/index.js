import { connect } from 'react-redux'
import Home from './home'
import Action from './action'

export const mapStateToProps = state => {
    return {
        home: state.home
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        fetchRecentSearches: () => {
            dispatch(Action.fetchRecentSearches())
        },
        pingWebsite: website => {
            dispatch(Action.pingWebsite(website))
        },
        resetPingResponse: () => {
            dispatch(Action.resetPingResponse())
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
