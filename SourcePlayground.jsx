//based on https://github.com/sapegin/react-styleguidist/blob/master/src/components/Playground/Playground.js

var React = require('react/addons');
//var Editor = require('./playground/editor.jsx');
var Preview = require('./playground/preview.jsx');

module.exports = React.createClass({
	propTypes: {
		code: React.PropTypes.string.isRequired
	},

	getInitialState: function() {
		return {
			code: this.props.code
		};
	},

	handleChange: function(newCode) {
		this.setState({
			code: newCode
		});
	},

	componentWillReceiveProps: function(nextProps) {
		var code = nextProps.code;

		if (code) {
			this.setState({
				code: code
			});
		}
	},

	renderEditor: function () {
		//if (process.env.IS_BROWSER) {
		//	return (
		//		<div className='.sourcejs_playground_editor'>
		//			<Editor code={code} onChange={this.handleChange}/>
		//		</div>
		//	);
		//} else {
			return null;
		//}
	},

	render: function() {
		var code = this.state.code;

		return (
			<div className='.sourcejs_playground'>
				<div className='.sourcejs_playground_preview'>
					<Preview code={code}/>
				</div>
				{this.renderEditor()}

			</div>
		);
	}
});