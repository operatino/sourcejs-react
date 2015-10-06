// Based on https://github.com/joelburget/react-live-editor/blob/master/live-compile.jsx

var React = require('react/addons');
var ReactTools = require('react-tools');

module.exports = React.createClass({
	propTypes: {
		code: React.PropTypes.string.isRequired
	},

	getInitialState: function() {
		return {
			error: null
		};
	},

	componentDidMount: function() {
		this.executeCode();
	},

	componentDidUpdate: function(prevProps) {
		if (this.props.code !== prevProps.code) {
			this.executeCode();
		}
	},

	compileCode: function() {
		return ReactTools.transform(
			this.props.code,
			{
				harmony: true
			}
		);
	},

	executeCode: function() {
		console.log('this.refs', this.refs);


		var mountNode = this.refs.mount.getDOMNode();

		try {
			React.unmountComponentAtNode(mountNode);
		} catch(e) {
		}

		this.setState({
			error: null
		});

		try {
			var compiledCode = this.compileCode();
			React.render(eval(compiledCode), mountNode);
		} catch (err) {
			React.unmountComponentAtNode(mountNode);
			this.setState({
				error: err.toString()
			});
		}
	},

	renderError: function() {
		var error = this.state.error;
		if (error) {
			return (
				<div className="playgroundError">{error}</div>
			);
		} else {
			return null;
		}
	},

	render: function() {
		return (
			<div>
				<div ref="mount"></div>
				{this.renderError()}
			</div>
		);
	}
});