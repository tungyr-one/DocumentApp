using System.Collections.Generic;
using System.Threading.Tasks;
using api.DTOs;
using api.Entities;
using DocumentApp.Entities;

namespace api.Interfaces
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