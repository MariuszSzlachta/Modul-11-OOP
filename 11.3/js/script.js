// (function () {
  document.addEventListener('DOMContentLoaded', function () {
    // generorwanie randomowego id
    function randomString() {
      var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
      var str = '';
      for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
      }
      return str;
    }
    // generowanie templatów
    function generateTemplate(name, data, basicElement) {
      var template = document.getElementById(name).innerHTML;
      var element = document.createElement(basicElement || 'div');

      Mustache.parse(template);
      element.innerHTML = Mustache.render(template, data);

      return element;
    }
    // tworzenie klasy kolumny
    function Column(name) {
      var self = this; // kontekst

      this.id = randomString(); // generowanie id
      this.name = name; // nazwa
      this.element = generateTemplate('column-template', {
        name: this.name,
        id: this.id
      }); // do element generujemy element nazwa: column-template, dane do mustache

      // dodaj funkcjonalość do klasy Column by każda stworzona instancja na kliknięcie elementu z klasą 'btn-delete' odpalała usówanie kolumny, a kliknięcie elementu z klasą addCard tworzyło nową instancję Card której nazwę pobierze z prompta.
      this.element.querySelector('.column').addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-delete')) {
          self.removeColumn();
        }
        if (event.target.classList.contains('add-card')) {
          self.addCard(new Card(prompt("Enter the name of card")));
        }
      });
    }
    //prototypy addCard i removeColumn
    Column.prototype = {
      addCard: function (card) {
        this.element.querySelector('ul').appendChild(card.element); // wybierz ul z this.element(naszej kolumny) i dodaj kartę by się wyświetlała na stronie. card.element bo element będzie naszym wygenerowanym szablonem
      },
      removeColumn: function () {
        this.element.parentNode.removeChild(this.element); // przejdź do rodzica i usuń dziecko, które wywołało metodę
      }
    }
    // KLASA CARD
    function Card(description) {
      var self = this; // kontekst

      this.id = randomString(); // id
      this.description = description;
      this.element = generateTemplate('card-template', {
        description: this.description
      }, 'li') // nazwa: card-template, do description wpisz podany w funkcji parametr description, li jako element ul którą jest nasza kolumna

      this.element.querySelector('.card').addEventListener('click', function (event) {
        event.stopPropagation();

        if (event.target.classList.contains('btn-delete')) {
          self.removeCard();
        }
      });
    }
    // prototyp removeCard
    Card.prototype = {
      removeCard: function () {
        this.element.parentNode.removeChild(this.element);
      }
    }
    // literał obiektu tablica kanban

    var board = {
      name: "Kanban Board", // nazwa
      addColumn: function (column) {
        this.element.appendChild(column.element); // dodaje możliwosc tworzenia kolumn // usówanie bezpośrednio z danej kolumny dlatego w column
        initSortable(column.id);
      },
      element: document.querySelector('#board .column-container')
    }
    //init sortable
    function initSortable(id) {
      var el = document.getElementById(id);
      var sortable = Sortable.create(el, {
        group: 'kanban',
        sort: true
      });
    }

    document.querySelector('#board .create-column').addEventListener('click', function () {
      var name = prompt('Enter a column name');
      var column = new Column(name);
      board.addColumn(column);
    });

    // CREATING COLUMNS
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // ADDING COLUMNS TO THE BOARD
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // CREATING CARDS
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // ADDING CARDS TO COLUMNS
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
  });
// })();