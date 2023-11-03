namespace Wines.Api.Models;

public class Seeder
{
    private readonly ApplicationContext _context;

    public Seeder(ApplicationContext context) => _context = context;

    public void Seed()
    {
        var tempranillo = new WineGrape("Tempranillo");
        var moscatel = new WineGrape("Moscatel");
        var syrah = new WineGrape("Syrah");
        var cabernetSauvignon = new WineGrape("Cabernet Sauvignon");
        var petitVerdot = new WineGrape("Petit Verdot");
        var zinfandel = new WineGrape("Zinfandel");
        var neroDavola = new WineGrape("Nero d’Avola");
        var malbec = new WineGrape("Malbec");
        var cabernetFranc = new WineGrape("Cabernet Franc");

        var grapes = new[] {
            tempranillo,
            moscatel,
            syrah,
            cabernetFranc,
            cabernetSauvignon,
            petitVerdot,
            zinfandel,
            neroDavola,
            malbec
        };

        if (!_context.WineGrapes.Any())
        {
            _context.WineGrapes.AddRange(grapes);
            _context.SaveChanges();
        }

        var wines = new[] {
            new Wine("Oro Tempranillo Valdepeñas", "Pata Negra", "Spain", tempranillo),
            new Wine("Criolla Argentina Moscatel", "Pala Corazon", "Argentina", moscatel),
            new Wine("Colheita de Inverno Moscato Colheita Tardia", "Casa Geraldo", "Brazil", moscatel),
            new Wine("Finca el Carril Hechicero", "Bodeda Iniesta", "Spain", syrah, cabernetSauvignon, tempranillo, petitVerdot),
            new Wine("Gran Reserva Colheita de Inverno Terroir Cabernet Sauvignon", "Casa Geraldo", "Brazil", cabernetSauvignon),
            new Wine("Zinfandel", "Woodbridge by Robert Mondavi", "United States", zinfandel),
            new Wine("Nero d'Avola", "Tenuta Sallier de la Tour", "Italy", neroDavola),
            new Wine("Aduentus Petit Blend", "Antigal", "Argentina", petitVerdot, malbec, cabernetFranc)
        };

        if (!_context.Wines.Any())
        {
            _context.Wines.AddRange(wines);
            _context.SaveChanges();
        }
    }
}