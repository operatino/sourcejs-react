// CodeMirror
var React = require('react/addons');
var _ = require('lodash');
var Codemirror_ = require('react-codemirror');

var UPDATE_DELAY = 100;

module.exports = React.createClass({
	propTypes: {
		code: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func
	},

	codemirrorOptions: {
		mode: 'xml',
		lineNumbers: false,
		lineWrapping: true,
		smartIndent: false,
		matchBrackets: true,
		viewportMargin: Infinity,
		theme: 'base16-light'
	},

	_handleChange: _.debounce(this.handleChange.bind(this), UPDATE_DELAY),

	handleChange: function(newCode) {
		var onChange = this.props.onChange;
		if (onChange) {
			onChange(newCode);
		}
	},

	render: function() {
		return (
			<div className='.sourcejs_playground'>
				<Codemirror value={this.props.code} onChange={this._handleChange} options={this.codemirrorOptions}/>
			</div>
		);
	}
});