package model.user;

public class Author extends RegisteredUser {

    private int countOfArticles = 0;

    public Author(String nickname, String name, String surname, String password) {
        super(nickname, name, surname, password);
    }

    public int getCountOfArticles() {
        return countOfArticles;
    }

    public void setCountOfArticles(int countOfArticles) {
        this.countOfArticles = countOfArticles;
    }
    
    /*
     * Ahoooooj! Tohleto je muj prispevek :-)
     * 
     * 
     * 
     * 
     */
}
