import React, { Component } from 'react';
import './App.css';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import TOC from './components/TOC';
import Control from './components/Control'
import CreateContent from './components/CreateContent';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: 'create',
			selected_content_id: 2,
			subject: { title: 'WEB', sub: 'world wide web!' },
			welcome: { title: 'Wecome', desc: "Hello, React!!" },
			contents: [
				{ id: 1, title: 'HTML', desc: 'HTML is HyperText ...' },
				{ id: 2, title: 'CSS', desc: 'CSS is for design ...' },
				{ id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive ...' },
			]
		};
	}

	render() {
		console.log('App render');
		var _title, _desc, _article = null;
		if (this.state.mode === 'welcome') {
			_title = this.state.welcome.title;
			_desc = this.state.welcome.desc;
			_article = <ReadContent title={_title} desc={_desc} />
		} else if (this.state.mode === 'read') {
			var i = 0;
			while (i < this.state.contents.length) {
				var data = this.state.contents[i];
				if (data.id === this.state.selected_content_id) {
					_title = data.title;
					_desc = data.desc;
					break;
				}
				i = i + 1;
			}
			_article = <ReadContent title={_title} desc={_desc} />
		} else if (this.state.mode === 'create') {
			_article = <CreateContent onSubmit={function (_title, _desc) { 
				this.setState({
					
				})
			}.bind(this)} />
		}

		return (
			<div className="App">
				<Subject
					title={this.state.subject.title}
					sub={this.state.subject.sub}
					onChangePage={function () {
						this.setState({
							mode: "welcome"
						})
					}.bind(this)}
				/>
				<TOC
					onChangePage={function (id) {
						this.setState({
							mode: "read",
							selected_content_id: Number(id)
						})

					}.bind(this)}
					data={this.state.contents} />
				<Control onChangeMode={function (mode) {
					this.setState({
						mode
					})
				}.bind(this)} />
				{_article}
			</div>
		);
	}
}

export default App;
