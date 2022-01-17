import React from 'react';
class NewsItem extends React.Component {
    render() {
        let {title, description, imageUrl, newsUrl} = this.props;
        return (
            <div className="my-3" >
               <div className="card" style={{width: '25rem'}}>
                    <img src= {!imageUrl?"https://ichef.bbci.co.uk/news/1024/branded_news/4397/production/_122630371_hi072995594.jpg ":imageUrl} className="card-img-top" alt="..."/>
                    
                    <div className="card-body bg-black">
                        <h5 className="card-title text-info ">{title}</h5>
                        <p className="card-text text-white">{description}</p>
                        <a rel = "noreferrer" href={newsUrl} target="_blank" className="btn btn-warning bg-black text-warning">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewsItem;
