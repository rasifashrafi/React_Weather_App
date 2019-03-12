import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit(e) {
        alert('You Submit your name: ' + this.input.value);
        e.preventDefault();
      }
    
    render(){
        return (
            // <div>
            //     <form onSubmit={this.handleSubmit}>
            //         <label>
            //             Name:
            //             <input type="text" ref={(input) => this.input = input} />
            //         </label> 
            //         <input type="submit" value="Submit" />
            //     </form>
                
            // </div>
            <form className = "search_form" onSubmit = {this.props.getWeather}>
                <div>
                    CITY : <input className="city" type ="text" name ="city" placeholder = "city......" />
                </div>
                <div>
                    COUNTRY : <input className="country" type ="text" name ="country" placeholder = "country......" />
                </div>
                <div>
                    <button className="form_button">Get Weather</button>
                </div>
            </form>
        );
    }
};

export default Form;