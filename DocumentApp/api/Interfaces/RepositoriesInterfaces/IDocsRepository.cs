using System.Linq;
using System.Threading.Tasks;
using DocumentApp.Entities;

namespace DocumentApp.Interfaces.RepositoriesInterfaces
{
   public interface IDocsRepository
   {
      ///<summary>
      /// Gets document
      ///</summary>
      Task<DocDb> GetDocAsync(int id);

      ///<summary>
      /// Gets documents list
      ///</summary>
      IQueryable<DocDb> GetDocsAsync();

      ///<summary>
      /// Updates document
      ///</summary>
      Task<bool> Update(DocDb doc);

      ///<summary>
      /// Creates document
      ///</summary>
      Task<bool> Create(DocDb doc);

      ///<summary>
      /// Deletes document
      ///</summary>
      Task<bool> Delete(int id);

      ///<summary>
      /// Checks if the document is in any category
      ///</summary>
      Task<bool> IsDocumentWithCategoryRelationExists(int id);
   }
}