using System.Linq;
using System.Threading.Tasks;
using DocumentApp.DTOs;
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
      Task<DocDb[]> GetDocsAsync(UserParams userParams);

      ///<summary>
      /// Updates document
      ///</summary>
      Task<bool> UpdateAsync(DocDb doc);

      ///<summary>
      /// Creates document
      ///</summary>
      Task<bool> CreateAsync(DocDb doc);

      ///<summary>
      /// Deletes document
      ///</summary>
      Task<bool> DeleteAsync(int id);

      ///<summary>
      /// Checks if the document is in any category
      ///</summary>
      Task<bool> IsDocumentWithCategoryRelationExistsAsync(int id);
   }
}