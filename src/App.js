import React, {Component, useState, useEffect} from "react";

const App = () => {
    // state
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('react')
    const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react')
    const [loading, setLoading] = useState(false)

    // fetch news
    const fetchNews = () => {
        // set loading true
        setLoading(true)

        fetch(url)
            .then(result => result.json())
            //.then(data => console.log(data))
            .then(data => (setNews(data.hits), setLoading(false)))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchNews()
    }, [url]);

    const handleChange = (e) => {
        setSearchQuery(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
    }

    const showLoading = () => ( loading ? <h2>Loading...</h2> : "" )

    const searchForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="text" value={searchQuery} onChange={handleChange}/>
            <button>Search</button>
        </form>
    )

    const showNews = () => {
       return news.map((n, i) => (
           <p key={i}>{n.title}</p>
       ))
    }

    return (
        <div>
            <h2>News</h2>
            <h3>Type what are you searching for</h3>
            {showLoading()}
            {searchForm()}
            {showNews()}
        </div>
    )

}

export default App;
